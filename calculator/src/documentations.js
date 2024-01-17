// React component function
function App() {
    // State variable 'value' to hold the current input value
    const [value, setValue] = useState("");
  
    // Function to handle clicks on operator buttons
    const handleOperatorClick = (operator) => {
      // Check if the clicked operator is one of '+', '-', '*', or '/'
      if (['+', '-', '*', '/'].includes(operator)) {
        // Ask for user confirmation before proceeding with the operation
        const isValidOperation = window.confirm("Please confirm to proceed with the operation.");
        
        // If user cancels the operation, do not update the value
        if (!isValidOperation) {
          return;
        }
      }
      // Update the value with the clicked operator
      setValue((prevValue) => prevValue + operator);
    };
  
    // Function to handle clicks on the equal (=) button
    const handleEqualClick = () => {
      try {
        // Use the 'eval' function to evaluate the expression and update the value
        setValue(eval(value));
      } catch (error) {
        // Display an alert for invalid operations and reset the value
        window.alert("Invalid operation. Please enter a valid expression.");
        setValue("");
      }
    };
  
    // Function to handle clicks on the clear (C) button
    const handleClearClick = () => {
      // Clear the current value
      setValue("");
    };
  
    // Function to handle clicks on the delete (DEL) button
    const handleDeleteClick = () => {
      // Remove the last character from the current value
      setValue((prevValue) => prevValue.slice(0, -1));
    };
  }
  