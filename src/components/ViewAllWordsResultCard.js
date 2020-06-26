import React from "react";

export const ViewAllWordsResultCard = (props) => {
  return (
    <div className="word-result-card">
      <p>
        <strong>ID: </strong>
        {props.word.id}
      </p>
      <p>
        <strong>Name: </strong>
        {props.word.word_name}
      </p>
      <p>
        <strong>Definition: </strong>
        {props.word.definition}
      </p>
      <button
        onClick={(e) => props.onHandleEdit(e, props.word.id)}
        className="card-edit-btn"
      >
        Edit
      </button>
      <button
        onClick={(e) => props.onHandleDelete(e, props.word.id)}
        className="card-delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

// class ViewAllWordsResultCard extends Component {
//   render() {
//     return (
//       <div className="word-result-card">
//         <p>
//           <strong>ID: </strong>
//           {props.word.id}
//         </p>
//         <p>
//           <strong>Name: </strong>
//           {props.word.word_name}
//         </p>
//         <p>
//           <strong>Definition: </strong>
//           {props.word.definition}
//         </p>
//         {/* <button
//           onClick={e => this.props.onHandleDelete(e, props.word.id)}
//           className="card-delete-btn"
//         >
//           Delete
//         </button> */}
//       </div>
//     );
//   }
// }

export default ViewAllWordsResultCard;
