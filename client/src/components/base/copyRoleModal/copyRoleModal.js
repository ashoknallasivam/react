import React, { Component, Fragment } from "react";
import { Input, Button, Modal, Row, Col, Preloader } from "react-materialize";
import uuid from "uuid";

class CopyRoleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTenant: "",
      organization: {},
      location: {},
      preloader: false,
      allRole: [],
      selectedRole: {},
      locRole: []
    };
  }
  componentWillMount() {
    //   this.props.actions.fetchAllTenants().then(response => {
    //     if (response.status !== 200) {
    //       //  console.log(response)
    //       alert(response);
    //     }
    //     this.setState({
    //       preloader: false
    //     });
    //     this.props.actions.fetchSavedTenants();
    //   });
  }
  componentWillReceiveProps(props) { }

  _input = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.name == "selectedRole") {
      this.state.allRole.map((data, index) => {
        if (data.id == e.target.value) {
          this.setState({
            selectedRole: data
          });
        }
      });
    }
    if (e.target.name == "organization") {
      let org = {};
      let orgRole = [];
      this.props.projectList[this.state.selectedTenant].orgsList.map(
        (data, i) => {
          if (data.id == e.target.value) org = data;
          // orgRole = data.roles
        }
      );
      this.setState({
        [e.target.name]: org,
        allRole: org.roles
      });
    }

    if (e.target.name == "location") {
      let org = {};
      let locRole = [];

      this.props.projectList[this.state.selectedTenant].orgsList.map(
        (data, i) => {
          if (data.id == e.target.value) org = data;
          // locRole = data.roles
        }
      );
      this.setState({
        [e.target.name]: org,
        allRole: org.roles
      });
    }

    if (e.target.name == "selectedTenant") {
      this.setState({
        preloader: true
      });

      this.props.actions.fetchSingleTenant(e.target.value).then(response => {
        this.setState({
          preloader: false
        });
        if (response.status !== 200)
          alert(
            response.data.message ? response.data.message : response.statusText
          );
      });
    }
  };

  _copyRole = () => {
    let copiedRole = {
      ...this.state.selectedRole,
      id: uuid.v4(),
      statusFlag: "new"
    };
    this.props.copyRole(copiedRole);
    this.props.CancelconfirmationModal();
  };

  _handleClose = () => { };

  render() {
    return (
      <Modal
        open={this.props.open}
        header={"Copy Role"}
        handleModalClose={this.props.handleModalClose}
        modalOptions={{ dismissible: false }}
      >
        <Col
          s={12}
          className={
            this.state.preloader
              ? "valign-wrapper leftzero loader-overlay-view"
              : "hide"
          }
        >
          <Preloader
            className="spinner"
            size="big"
            active={this.state.preloader}
          />
        </Col>

        <Col s={12}>
        <label className="pl-1">Project Name</label>
          <select
            className="col  mt-1 ml-1 pl-0 Dropdown"
            name="selectedTenant"
            onChange={this._input}
            value={this.state.selectedTenant}
          >
            <option value="">Select tenant</option>
            {Object.values(this.props.projectList).map((data, index) => {
              if (data.projectStatus == undefined)
                return <option value={data.id}> {data.name}</option>;
            })}
          </select>
        </Col>

        <Row>
          <Col s={6}>
            {this.state.selectedTenant && (
              <div className="pt-2">
              <label className="pl-1">Organization</label>
              <select
                className="col mt-1 ml-1 pl-0 Dropdown"
                name="organization"
                onChange={this._input}
                value={this.state.organization.id}
              >
                <option value="">Select an organization</option>
                {this.props.projectList[this.state.selectedTenant].orgsList.map(
                  (data, index) => {
                    if (data.ttoId == null)
                      return <option value={data.id}> {data.name}</option>;
                  }
                )}
              </select>
              </div>
            )}
          </Col>

          <Col s={6}>
            {Object.keys(this.state.organization).length > 0 && (
              <div className="pt-2">
              <label className="pl-1">Location</label>
              <select
                className="col  mt-1 ml-1 pl-0 Dropdown"
                name="location"
                onChange={this._input}
                value={this.state.location.id}
              >
                <option value="">Select a location</option>
                {this.props.projectList[this.state.selectedTenant].orgsList.map(
                  (data, index) => {
                    if (data.ttoId == this.state.organization.id)
                      return <option value={data.id}> {data.name}</option>;
                  }
                )}
              </select>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          {this.state.allRole && (
            <select
              className="col  mt-1 ml-1 pl-0 Dropdown"
              name="selectedRole"
              onChange={this._input}
              value={this.state.allRole.id}
            >
              <option value="">Select a role</option>
              {this.state.allRole.map((data, index) => {
                return <option value={data.id}> {data.name}</option>;
              })}
            </select>
          )}
        </Row>

        <div className="col s12 m12 l12 xl12">
          <Button
            className="btn btn_secondary otherButtonAddDetUpt modalButton mb-2 ml-1"
            onClick={this._copyRole}
          >
            Copy
          </Button>
          <Button
            className="btn btn_secondary otherButtonAddDetUpt modalButton mb-2 ml-1"
            onClick={this.props.CancelconfirmationModal}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }
}

export default CopyRoleModal;
