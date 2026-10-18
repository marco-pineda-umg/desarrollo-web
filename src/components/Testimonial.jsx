export default function Testimonial({ name, comment, picture, time }) {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={picture} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{comment}</p>
            <p className="card-text">
              <small className="text-body-secondary">{time}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
