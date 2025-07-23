// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

// const options = [
//   {
//     value: "option1",
//     label: "Option 1",
//     description: "this is description option 1",
//   },
//   {
//     value: "option2",
//     label: "Option 2",
//     description: "this is description option 2",
//   },
//   {
//     value: "option3",
//     label: "Option 3",
//     description: "this is description option 3",
//   },
//   {
//     value: "option4",
//     label: "Option 4",
//     description: "this is description option 4",
//   },
//   {
//     value: "option5",
//     label: "Option 5",
//     description: "this is description option 5",
//   },
// ];

// class Pickers extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       notes: "",

//       selectedOptions: "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange = (selected) => {
//     
//     this.setState({ selectedOptions: selected });
//   };

//   render() {
//     
//     return (
//       <Modal
//         {...this.props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         // style={}
//       >
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Select Picker
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Select
//             value={this.state.selectedOptions}
//             onChange={this.handleChange}
//             options={options}
//             // component={animatedComponents}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={() => this.props.onSaveNotes(this.state.notes)}>
//             Save
//           </Button>
//           <Button onClick={this.props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }

//   //  extractTextFromHTML(html) {
//   //     // Remove HTML tags using regular expression
//   //     const textContent = html?.replace(/<[^>]*>/g, '');
//   //     // Replace &amp; with &
//   //     const decodedContent = textContent?.replace(/&amp;/g, '&');
//   //     return decodedContent;
//   // }
// }

// export default Pickers;






// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// import Select from "react-select";

// class Pickers extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       notes: "",
//       selectedOptions: null, // Change to null for a proper default state
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange = (selected) => {
//     
//     this.setState({ selectedOptions: selected });
//   };

//   formatOptionLabel = (option) => {
//     return (
//       <>
//         <span>{option.code} </span>
//         <span>({option.description})</span>
//       </>
//     );
//   };

//   render() {
//     
//     

//     // Custom styles for the select component
//     const customStyles = {
//       control: (provided) => ({
//         ...provided,
//         borderColor: 'gray', // Change the border color
//         boxShadow: 'none', // Remove box-shadow
//         '&:hover': {
//           borderColor: 'gray', // Keep the border color same when hovered
//         },
//       }),
//       option: (provided, state) => ({
//         ...provided,
//         backgroundColor: state.isFocused ? '#f0f0f0' : 'white', // Light background on hover/focus
//         color: state.isSelected ? '#333' : '#000', // Darker text when selected
//         cursor: 'pointer',
//         padding: '10px',
//       }),
//       singleValue: (provided) => ({
//         ...provided,
//         color: '#000', // Change selected value text color
//       }),
//     };

//     return (
//       <Modal
//         {...this.props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Choose Picker for Document ({this.props.selectedDocNumber})
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Select
//             value={this.state.selectedOptions}
//             onChange={this.handleChange}
//             options={this.props.pickersList}
//             formatOptionLabel={this.formatOptionLabel} // Custom label rendering
//             getOptionLabel={(option) => `${option.code} - ${option.description}`} // Search by code and description
//             styles={customStyles} // Apply the custom styles
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={() => this.props.onSavePickers(this.state.selectedOptions?.code)}>
//             Save
//           </Button>
//           <Button onClick={this.props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }
// }

// export default Pickers;


import React from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";

class Pickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      selectedOptions: null, // Default state as null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setDefaultSelectedOption();
  }

  componentDidUpdate(prevProps) {
    // If selectedDocNumber or currDropsPanel props change, update the default value
    if (
      prevProps.selectedDocNumber !== this.props.selectedDocNumber ||
      prevProps.currDropsPanel !== this.props.currDropsPanel
    ) {
      this.setDefaultSelectedOption();
    }
  }

  // Function to set default selected option based on the selectedDocNumber
  setDefaultSelectedOption() {
    const { selectedDocNumber, currDropsPanel, pickersList } = this.props;

    // Find the matching object in currDropsPanel by selectedDocNumber
    const selectedDoc = currDropsPanel.find(
      (item) => item.docnum === selectedDocNumber
    );

    // If found and has a picker value
    if (selectedDoc && selectedDoc.picker) {
      const pickerCode = selectedDoc.picker;

      // Find the corresponding option in the pickersList
      const defaultOption = pickersList.find((option) => option.code === pickerCode);

      // If a matching option is found, set it as the default selected value
      if (defaultOption) {
        this.setState({ selectedOptions: defaultOption });
      }
    }

    // If no default option is found, select the first option from pickersList
    if (!this.state.selectedOptions && pickersList.length > 0) {
      this.setState({ selectedOptions: pickersList[0] });
    }
  }

  handleChange = (selected) => {
    
    this.setState({ selectedOptions: selected });
  };

  formatOptionLabel = (option) => {
    return (
      <>
        <span>{option.code} </span>
        <span>({option.description})</span>
      </>
    );
  };

  render() {
    
    

    // Custom styles for the select component
    const customStyles = {
      control: (provided) => ({
        ...provided,
        borderColor: 'gray',
        boxShadow: 'none',
        '&:hover': {
          borderColor: 'gray',
        },
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
        color: state.isSelected ? '#333' : '#000',
        cursor: 'pointer',
        padding: '10px',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: '#000',
      }),
    };

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose Picker for Document ({this.props.selectedDocNumber})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            value={this.state.selectedOptions}
            onChange={this.handleChange}
            options={this.props.pickersList}
            formatOptionLabel={this.formatOptionLabel}
            getOptionLabel={(option) => `${option.code} - ${option.description}`}
            styles={customStyles}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onSavePickers(this.state.selectedOptions?.code)}>
            Save
          </Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Pickers;
