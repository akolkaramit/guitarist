import React, { Component } from "react";
import tambola from "tambola-generator";
import { saveAsJpeg } from "save-html-as-image";


class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketCount: 4,
      tickets: [],
    };
  }

  generateTickets = (e) => {
    e.preventDefault();
    const value = this.state.ticketCount;
    const tickets = tambola.getTickets(value);

    this.setState({
      tickets: tickets,
    });
  };

  chnageInput = (e) => {
    this.setState({
      ticketCount: e.target.value,
    });
  };

  downloadTicket = (ticketID) => {
    let targetImageID = document.getElementById(`table${ticketID}`);

    saveAsJpeg(targetImageID, {
      filename: `Ticket${ticketID + 1}`,
      printDate: true,
    });
  };

  downloadAllTickets = () => {
    const { length } = this.state.tickets;
    for (let i = 0; i < length; i++) {
      let targetImageID = document.getElementById(`table${i}`);
      saveAsJpeg(targetImageID, {
        filename: `Ticket${i + 1}`,
        printDate: true,
      });
    }
  };

  downloadChart = () => {
    let targetImageID = document.getElementById("chart");

    saveAsJpeg(targetImageID, {
      filename: "Tickets",
      printDate: true,
    });
  };

  render() {
    const { tickets, ticketCount } = this.state;

    return (
      <div className="tambola-body">
        <h1 id="dfvfgfvhgfvh">Tambola Ticket Generator</h1>
        <div className="tambola-wrapper">
          <form className="tambola-form" onSubmit={this.generateTickets}>
            <input
              className="tambola-input"
              type="text"
              value={ticketCount}
              onChange={this.chnageInput}
            />
            <button
              className="tambola-btn"
              type="submit"
              value="Generate Tickets"
            >
              Generate Tickets
            </button>
            {tickets.length > 0 ? (
              <React.Fragment>
                <button
                  className="tambola-btn"
                  onClick={this.downloadAllTickets}
                >
                  Download all Tickets separately
                </button>
                <button className="tambola-btn" onClick={this.downloadChart}>
                  Download Chart
                </button>
              </React.Fragment>
            ) : null}
          </form>
          <div id="chart">
            {tickets.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="tambola-table-margin">
                    <div id={"table" + index}>
                      <h3 className="ticket-name">Ticket {index + 1}</h3>
                      <table key={index} className="tambola-table">
                        <tbody className="tambola-tbody">
                          {data.map((ticketRows, ind) => {
                            return (
                              <tr className="tambola-tr">
                                <td
                                  className={
                                    ticketRows[0] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[0] || null}
                                </td>
                                <td
                                  className={
                                    ticketRows[1] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[1] || null}
                                </td>
                                <td
                                  className={
                                    ticketRows[2] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[2] || null}
                                </td>
                                <td
                                  className={
                                    ticketRows[3] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[3] || null}
                                </td>
                                <td
                                  className={
                                    ticketRows[4] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[4] || null}
                                </td>
                                <td
                                  className={
                                    ticketRows[5] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[5] || null}
                                </td>
                                <td
                                  className={
                                    ticketRows[6] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[6] || null}
                                </td>
                                <td
                                  className={
                                    ticketRows[7] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[7] || null}
                                </td>
                                <td
                                  className={
                                    ticketRows[8] === 0
                                      ? "tambola-td-null"
                                      : "tambola-td"
                                  }
                                >
                                  {ticketRows[8] || null}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <button
                      className="tambola-download-ticket-btn"
                      onClick={() => this.downloadTicket(index)}
                    >
                      Download Ticket
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
