import React from 'react'
import axios from 'axios'

class FetchData extends React.Component {
    // State will apply to the posts object which is set to loading by default
    state = {
        users: [],
        isLoading: true,
        errors: null
      };
    // Now we're going to make a request for data using axios
    getUsers() {
        // We're using axios instead of Fetch
        axios
          // The API we're requesting data from
          .get("http://www.json-generator.com/api/json/get/bVfRXNoDTm?indent=2")
          // Once we get a response, we'll map the API endpoints to our props
          .then(response =>
            response.data.data.transaction.map(user => ({
              sender: `${user.sender}`,
              time: `${user.timestamp}`,
              transaction: `${user.transaction_type}`,
              amount: `${user.amount}`,
              recipient: `${user.recipient}`,
              description: `${user.transaction_description}`
            }))
          )
          // Let's make sure to change the loading state to display the data
          .then(users => {
            this.setState({
              users,
              isLoading: false
            });
          })
          // We can still use the `.catch()` method since axios is promise-based
          .catch(error => this.setState({ error, isLoading: false }));
      }
    // Let's our app know we're ready to render the data
    componentDidMount() {
        this.getUsers();
      }
    // Putting that data to use
    render() {
        const { isLoading, users } = this.state;
        return (
         <React.Fragment>
            <table className="table">
                <thead className="thead-light">
                     <tr>
                        <th scope="col">Waktu</th>
                        <th scope="col">Keterangan</th>
                        <th scope="col">Transaksi</th>
                        <th scope="col">Pengirim</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Penerima</th>
                    </tr>
                </thead>
              {!isLoading ? (
                users.map(user => {
                  const { time, sender, amount, recipient, description, transaction } = user;

                  //konversi timestamp
                  let timestamp = parseInt(time);
                  //konversi ke millisecond
                  var milisekon = new Date(timestamp * 1000);
                  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                  var year = milisekon.getFullYear();
                  var month = months[milisekon.getMonth()];
                  var date = milisekon.getDate();
                  // Hours part from the timestamp
                  var hour = milisekon.getHours();
                  // Minutes part from the timestamp
                  var min = milisekon.getMinutes();
                  // Seconds part from the timestamp
                  var sec = milisekon.getSeconds();
                  //menampilkan waktu yang telah dikonversi
                  var waktu = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

                  //menampilkan jenis transaksi
                  var transaksi;
                  if (transaction ==="1"){
                    transaksi = "deposit"
                  }
                  else if (transaction ==="2") {
                    transaksi = "withdrawal" 
                  }
                  else {
                    transaksi = "transfer"
                  }


                  return (
                    <tbody>
                    <tr key={sender}>
                      <td>{waktu}</td>
                      <td>{description}</td>
                      <td>{transaksi}</td>
                      <td>{sender}</td>
                      <td>{amount}</td>
                      <td>{recipient}</td>
                    </tr>
                    </tbody>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </table>
         </React.Fragment>
        );
      }
  }


export default FetchData;