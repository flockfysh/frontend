import Button from '../../../UI/button/button';

import classes from '../common.module.css';

export default function Overview(props: { dataset: Dataset }) {
  return (
    <div className={ classes.container }>
      <div className={ classes.contentContainer }>
        <h1>{ props.dataset.name } dataset</h1>

        <p>{ props.dataset.overview }</p>

        <div className={ classes.infoCards }>
          <div>Images: { props.dataset.datasetImages.length }</div>

          <div>Size of Dataset: { props.dataset.size }Gb</div>

          <div>Date created: { props.dataset.dateCreated }</div>
        </div>

        <div className={ classes.btnContainer }>
          <Button to="/dashboard" text="Return to Profile" hasArrow={ true } />
        </div>
      </div>
    </div>
  );
}
