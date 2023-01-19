import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import 'animate.css'

const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter/>
    </AppTheme>
  );
};

export default JournalApp;
