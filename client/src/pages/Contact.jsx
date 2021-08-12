import { Button, TextField, useFormControl } from "@material-ui/core";

const inputFieldValues = [
	{
	  name: "fullName",
	  label: "Full Name",
	  id: "my-name"
	},
	{
	  name: "email",
	  label: "Email",
	  id: "my-email"
	},
	{
	  name: "message",
	  label: "Message",
	  id: "my-message",
	  multiline: true,
	  rows: 10
	}
  ];
  export const Contact = () => {
	return (
	  <form >
		{inputFieldValues.map((inputFieldValue, index) => {
		  return (
			<TextField
			  key={index}
			  name={inputFieldValue.name}
			  label={inputFieldValue.label}
			  multiline={inputFieldValue.multiline ?? false}
			  rows={inputFieldValue.rows ?? 1}
		  	autoComplete="none"  
			/>
		  );
		})}
		<Button
		  type="submit"
		>
		  Send Message
		</Button>
	  </form>
	)
  }