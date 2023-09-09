import api from './api';


export async function uploadAndChunk(
  chunkSize:number = 1024 * 1024 * 5, //In MB
  file: File,
  initializeMultipartEndpoint: string,
  datasetId: string,
) {
    //Initialize an upload 
    const initInput = {
      datasetId: datasetId,
      options: {
        originalname: file.name,
        size: file.size, 
        mimetype: file.type,   
      },
    };

    const initializeReponse = await api.request({
      url: initializeMultipartEndpoint,
      method: 'POST',
      data: initInput,
    });

    const AWSFileDataOutput = initializeReponse.data.data.multi;

    const Key = AWSFileDataOutput.Key;
    const UploadId = AWSFileDataOutput.UploadId;

    // retrieving the pre-signed URLs
    const numberOfparts = Math.ceil(file.size / chunkSize);

    let uploadParts:any = []

    const promises = []

    for(let i = 0; i < numberOfparts; i++) {
      const file_slice = file.slice(i * chunkSize, (i + 1) * chunkSize)
      
      const formData = new FormData()
      formData.append("file", file_slice)
      formData.append("UploadId", UploadId)
      formData.append("Key", Key)
      formData.append("PartNumber", i.toString())
      
      const p = new Promise(async (res, rej) => {

        api.post('/api/general/multi/part', formData).then((res:any) => {
          console.log('return data, ', res.data)
          uploadParts.push({
            PartNumber: i + 1, //0 causes an error
            ETag: res.data.ETag,
          })
          console.log('ret', uploadParts)

        }).then(() => {
          res(200)
        }).catch(() => {
          rej(404)
        })  
      })
      
      

      promises.push(p)

    }

    console.log('sending all promises')
    await Promise.all(promises).then(async () => {

      console.log('sending through completion')
      console.log(uploadParts)
  
      await api.post('/api/general/multi/done', {
        Key: Key,
        UploadId: UploadId,
        Parts: uploadParts,
      }).then((res) => {
        console.log('upload success')
      }).catch((err) => {
        console.log('fail', err)
      })
  
    })


}