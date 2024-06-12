const TopicDetails = ({ title, description, icon, brandImg }) => {
    return (
      <div className="mdn-TopicDetails">
        <div className="mdn-TopicDetails-group">
          <div className="mdn-Topic mdn-Topic--horizontal mdn-Topic--sm">
            <div className="mdn-Topic-symbol">
              {icon && <i className={`${icon} mdn-Icon--sm`}></i>}
              {brandImg && <img src={brandImg} alt="" />}
            </div>
            <p className="mdn-Topic-description">{title}</p>
          </div>
          <p className="mdn-Text mdn-Text--body">{description}</p>
        </div>
      </div>
    );
  };
  
  export default TopicDetails;  