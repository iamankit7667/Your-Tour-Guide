import React from "react";

function review_rating() {
  const modalBg = document.querySelector(".modal-bg");
  modalBg.classList.toggle("bg-active");
}
function clicked(event) {
  event.preventDefault();
  alert(`Submitted`);
}
function Submit() {
  return (
    <div className="modal-bg">
      <div className="review-submit">
        <h2>Submit your review and rating</h2>
        <form onSubmit={clicked}>
          <label htmlFor="rating">Give your rating:</label>
          <select name="rating" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br />
          <label htmlFor="review">Submit your review:</label>
          <br />
          <textarea
            name="review"
            id="review"
            cols="auto"
            rows="auto"
            placeholder="submit your review"
          ></textarea>
          <br />

          <button className="btn">Submit</button>
        </form>
        <span onClick={review_rating}>X</span>
      </div>
    </div>
  );
}
export default Submit;
