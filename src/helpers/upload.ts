import api from './api';


export async function uploadAndChunk(
  chunkSize:number = 1024 * 1024 * 10,
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

    const UploadId = AWSFileDataOutput.UploadId;
    const UploadKey = AWSFileDataOutput.Key;

    // retrieving the pre-signed URLs
    const numberOfparts = Math.ceil(file.size / chunkSize);

    let uploadParts:any = []

    const promises = []

    for(let i = 0; i < numberOfparts; i++) {
      const slice = file.slice(i * chunkSize, (i + 1) * chunkSize)
      
      const formData = new FormData()
      formData.append("file", slice)
      formData.append("UploadId", UploadId)
      formData.append("UploadKey", UploadKey)
      formData.append("PartNumber", i.toString())
      
      const p = api.post('/api/general/multi/part', formData).then((res:any) => {
        console.log('return data, ', res.data)
        uploadParts.push({
          PartNumber: i,
          ETag: res.ETag,
        })
      })

      promises.push(p)

    }

    console.log('sending all promises')
    await Promise.all(promises)

    console.log('sending through completion')
    await api.post('/api/general/multi/done', {
      Parts: uploadParts,
      UploadId: UploadId,
      UploadKey: UploadKey,
    }).then((res) => {
      console.log('upload success')
    }).catch((err) => {
      console.log('fail', err)
    })

}

export class Uploader {
    chunkSize: number;
    threadsQuantity: number;
    file: any;
    fileName: any;
    aborted: boolean;
    uploadedSize: number;
    initMulti: string;
    progressCache: any;
    activeConnections: any;
    parts: any;
    uploadedParts: any;
    fileId: null;
    fileKey: null;
    datasetId: string;
    onProgressFn: () => void;
    onErrorFn: () => void;
    constructor(options: { chunkSize: number; threadsQuantity: any; file: File; fileName: any, initMultiURL: string, datasetId: string }) {
      // this must be bigger than or equal to 5MB,
      // otherwise AWS will respond with:
      // "Your proposed upload is smaller than the minimum allowed size"
      this.chunkSize = options.chunkSize || 1024 * 1024 * 5;
      // number of parallel uploads
      this.threadsQuantity = Math.min(options.threadsQuantity || 5, 15);
      this.file = options.file;
      this.initMulti = options.initMultiURL;
      this.fileName = options.fileName;
      this.aborted = false;
      this.uploadedSize = 0;
      this.progressCache = {};
      this.activeConnections = {};
      this.parts = [];
      this.uploadedParts = [];
      this.fileId = null;
      this.fileKey = null;
      this.datasetId = options.datasetId;
      this.onProgressFn = () => {};
      this.onErrorFn = () => {};
    }
  
    // starting the multipart upload request
    start() {
      this.initialize();
    }
  
    async initialize() {
      try {
        // adding the the file extension (if present) to fileName
        let fileName = this.fileName;
        const ext = this.file.name.split('.').pop();
        if (ext) {
          fileName += `.${ext}`;
        }
  
        // initializing the multipart request
        const videoInitializationUploadInput = {
          datasetId: this.datasetId,
          options: {
            originalname: fileName,
            size: this.file.size, 
            mimetype: this.file.type,   
          },
        };

        console.log('sending', videoInitializationUploadInput);

        const initializeReponse = await api.request({
          url: this.initMulti,
          method: 'POST',
          data: videoInitializationUploadInput,

        });
  
        const AWSFileDataOutput = initializeReponse.data.data.multi;

        console.log(AWSFileDataOutput);
        
        this.fileId = AWSFileDataOutput.UploadId;
        this.fileKey = AWSFileDataOutput.Key;
  
        // retrieving the pre-signed URLs
        const numberOfparts = Math.ceil(this.file.size / this.chunkSize);
  
        const AWSMultipartFileDataInput = {
          fileId: this.fileId,
          fileKey: this.fileKey,
          parts: numberOfparts,
        };
        
        console.log('start requeset');
        const urlsResponse = await api.request({
          url: '/api/general/multi/urls',
          method: 'POST',
          data: AWSMultipartFileDataInput,
        });

  
        const newParts = urlsResponse.data.parts;
        console.log('parts', newParts);

        this.parts.push(...newParts);
  
        this.sendNext();

        console.log('completed');
        this.complete();

      }
 catch (error) {
        console.log('ERROR: ', error);
        await this.complete(error);
      }
    }
  
    sendNext() {
      const activeConnections = Object.keys(this.activeConnections).length;
  
      console.log(activeConnections, this.threadsQuantity);

      if (activeConnections >= this.threadsQuantity) {
        console.log('returning');
        return;
      }
  
      if (!this.parts.length) {
        if (!activeConnections) {
          this.complete({ 'success' : true });
          console.log('done');
        }
  
        return;
      }
  
      const part = this.parts.pop();
      if (this.file && part) {

        console.log('gooing');

        const sentSize = (part.PartNumber - 1) * this.chunkSize;
        const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);
  
        console.log(sentSize, chunk);


        const sendChunkStarted = () => {
          console.log('sending chunk from started');
          this.sendNext();
          console.log('sent next');

        };
  
        this.sendChunk(chunk, part, sendChunkStarted).then(() => {
            console.log('start next');
            this.sendNext();
            console.log('next');            
          }).catch((error) => {
            console.log('error', error);
            this.parts.push(part);
  
            this.complete(error);
          });
      }
    }
  
    // terminating the multipart upload request on success or failure
    async complete(error?: any) {
      if (error && !this.aborted) {
        console.log('erorred out');
        this.onErrorFn();
        return;
      }
  
      if (error) {
        console.log('error funky');
        this.onErrorFn();
        return;
      }
  
      try {
        console.log('sending commpletion');
        await this.sendCompleteRequest();
      }
 catch (error) {
        this.onErrorFn();
      }
    }
  
    // finalizing the multipart upload request on success by calling
    // the finalization API
    async sendCompleteRequest() {

      console.log('completion');
      if (this.fileId && this.fileKey) {

        console.log(this.uploadedParts);
        const videoFinalizationMultiPartInput = {
          fileId: this.fileId,
          fileKey: this.fileKey,
          parts: this.uploadedParts,
        };

        console.log('sending');  
        await api.request({
          url: '/api/general/multi/done',
          method: 'POST',
          data: videoFinalizationMultiPartInput,
        });
      }
    }
  
    sendChunk(chunk: any, part: any, sendChunkStarted: () => void) {
      return new Promise((resolve, reject) => {
        this.upload(chunk, part, sendChunkStarted)
          .then((status) => {
            if (status !== 200) {
              reject(new Error('Failed chunk upload'));
              return;
            }
  
            resolve({ 'success' : true });
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  
    // calculating the current progress of the multipart upload request
    handleProgress(part: string | number, event: { type: string; loaded: any }) {
      if (this.file) {
        if (event.type === 'progress' || event.type === 'error' || event.type === 'abort') {
          this.progressCache[part] = event.loaded;
        }
  
        if (event.type === 'uploaded') {
          this.uploadedSize += this.progressCache[part] || 0;
          delete this.progressCache[part];
        }
  
        const inProgress = Object.keys(this.progressCache)
          .map(Number)
          .reduce((memo, id) => (memo += this.progressCache[id]), 0);
  
        const sent = Math.min(this.uploadedSize + inProgress, this.file.size);
  
        const total = this.file.size;
  
        const percentage = Math.round((sent / total) * 100);
  
        this.onProgressFn();
      }
    }
  
    // uploading a part through its pre-signed URL
    upload(file: XMLHttpRequestBodyInit | null | undefined, part: { PartNumber: number; signedUrl: string }, sendChunkStarted: () => void) {
      // uploading each part with its pre-signed URL
      
      console.log('uploading now ...', file);
      return new Promise((resolve, reject) => {
        if (this.fileId && this.fileKey) {
          // - 1 because PartNumber is an index starting from 1 and not 0
          const axiosResponse = api.put(part.signedUrl, {
            data: file,
      
          }).then((res) => {
            console.log(res, part.PartNumber);
          });
            
        }
      });
    }
  
    onProgress(onProgress: any) {
      this.onProgressFn = onProgress;
      return this;
    }
  
    onError(onError: any) {
      this.onErrorFn = onError;
      return this;
    }
  
    abort() {
      Object.keys(this.activeConnections)
        .map(Number)
        .forEach((id) => {
          this.activeConnections[id].abort();
        });
  
      this.aborted = true;
    }
}
