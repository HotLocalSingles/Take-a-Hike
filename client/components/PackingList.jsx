import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

const PackingListItems = ({
  userId,
  packingListNames,
  listName,
  packingListDescription,
}) => {
  //create state variable
  const [packingListItems, setPackingListItems] = useState({
    listItem: '',
    listItems: [],
  });

  useEffect(() => {
    axios
      .get('/api/packingListItems')
      .then((response) => {
        console.log('ALL LISTS FROM DATABASE LINE 79 ||', response.data);
        setPackingListItems((state) => {
          return { ...state, listItems: response.data };
        });
      })
      .catch((err) => {
        console.error('LINE 68 ERROR ON THE SERVER SIDE', err);
      });
    return packingListItems;
  }, []);

  //captures input list name from the user
  const handleChange = (e) => {
    //set name in state
    console.log(e);
    setPackingListItems((state) => {
      return { ...state, listItem: e.target.value };
    });
  };

  const handleSubmit = (event) => {
    //allow react to control the state variables changed on change
    event.preventDefault();
    axios
      //send the user list to the server
      .post('/api/packingListItems', {
        listItem: packingListItems.listItem,
      })
      .then((data) => {
        console.log(packingListItems.listItem, 'FROM LINE 52', data);
      })
      .catch((err) => {
        console.error('Something went really Wrong', err);
      });
  };
  //console.log(packingListItems.listItems);

  //distructure all state variables for usage
  let { listItem } = packingListItems;
  return (
    <div>
      <div>
        <h2>{listName}</h2>
        <p>{packingListDescription}</p>
        <li>{listItem}</li>;
      </div>
      <h3>Enter your list Items bellow</h3>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          className='input is-info'
          type='text'
          placeholder='List item'
          onChange={handleChange}
          name='listItem'
          value={listItem}
        />
        <button type='submit'> save</button>
      </form>
      <br></br>
      <br></br>
      <div>
        <h2>{listName}</h2>
        <p>{packingListDescription}</p>
        {/* <ul>
          {listItems.map((item) => {
            return <li>{item}</li>;
          })}
        </ul> */}
      </div>
    </div>
  );
};

export default PackingListItems;

{
  /* <Link to={`/trailprofile/${trail.id}`}>
  <div className="trails">
    <div className="trail-card">
      <img src={trail.thumbnail} />
      <h3>{trail.name}</h3>
      <div className="info-group">
        <p>City: {trail.city}</p>
      </div>
      <div className="info-group">
        <p>State: {trail.region}</p>
      </div>
      <div className="info-group">
        <p>Rating: {trail.rating}</p>
      </div>
    </div>
  </div>
</Link>; */
}
