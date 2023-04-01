import { useVisualMode } from "hooks/useVisualMode";

export default function useAppointmentData(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? "SHOW" : "EMPTY"
  );

  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    const editMode = mode === "EDIT";

    transition("SAVING");

    try {
      await props.bookInterview(props.id, interview, editMode);
      transition("SHOW");
    } catch {
      transition("ERROR_SAVE", true);
    }
  };

  const del = async () => {
    transition("DELETING", true);

    try {
      await props.cancelInterview(props.id);
      transition("EMPTY");
    } catch (error) {
      transition("ERROR_DELETE", true);
    }
  };

  return { mode, transition, back, save, del };
}
