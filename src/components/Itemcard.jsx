export default function Itemcard({
  image,
  title,
  description,
  price,
  info,
  onVerMas,
}) {
  return (
    <div className="card">
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-price">{price}</p>
        <button
          className="btn btn-item"
          data-bs-toggle="modal"
          data-bs-target="#infoModal"
          onClick={() => onVerMas(info)}
        >
          ver mas
        </button>
      </div>
    </div>
  );
}
