import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import useAppointmentData from "hooks/useAppointmentData";

export default function Appointment(props) {
  const { mode, transition, back, save, del } = useAppointmentData({
    interview: props.interview,
    bookInterview: props.bookInterview,
    cancelInterview: props.cancelInterview,
    id: props.id,
  });

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === "EMPTY" && <Empty onAdd={() => transition("CREATE")} />}
      {(mode === "CREATE" || mode === "EDIT") && (
        <Form
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === "SHOW" && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={
            props.interview &&
            props.interview.interviewer &&
            props.interview.interviewer.name
          }
          onDelete={() => transition("CONFIRM")}
          onEdit={() => transition("EDIT")}
        />
      )}
      {mode === "SAVING" && <Status message="Saving" />}
      {mode === "DELETING" && <Status message="Deleting" />}
      {mode === "CONFIRM" && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={del}
        />
      )}
      {mode === "ERROR_SAVE" && (
        <Error message="Server Error. Could not save changes." onClose={back} />
      )}
      {mode === "ERROR_DELETE" && (
        <Error
          message="Server Error. Could not delete appointment."
          onClose={back}
        />
      )}
    </article>
  );
}
