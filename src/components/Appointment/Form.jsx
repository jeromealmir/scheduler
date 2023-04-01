/**
 * A form component that allows a user to create or edit an appointment.
 * 
 * @param {Object} props - The props object containing the following properties:
 * @param {String} props.student - The name of the student.
 * @param {Number} props.interviewer - The ID of the interviewer.
 * @param {Array} props.interviewers - An array of interviewers to be displayed in the interviewer list.
 * @param {Function} props.onCancel - A function to be called when the user clicks the cancel button.
 * @param {Function} props.onSave - A function to be called when the user clicks the save button.
 * @returns {JSX.Element} - A React component representing the appointment form.
*/

import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import useFormData from "hooks/useFormData";

export default function Form(props) {

  const { state, setStudent, setInterviewer, cancel, validate } = useFormData({
    student: props.student,
    interviewer: props.interviewer,
    onCancel: props.onCancel,
    onSave: props.onSave
  });

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={state.student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{state.error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={state.interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
