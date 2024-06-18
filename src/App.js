// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

// auth-provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <AuthProvider>
      <Locales>
        <ScrollTop>
          <>
            <Notistack>
              <Routes />
              <Snackbar />
            </Notistack>
          </>
        </ScrollTop>
      </Locales>
    </AuthProvider>
  </ThemeCustomization>
);

export default App;
