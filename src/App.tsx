import { Redirect, Route } from "react-router-dom";
import { useState } from "react";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { heartOutline, paw } from "ionicons/icons";
import { Tab1 } from "./pages/Tab1";
import { Tab2 } from "./pages/Tab2";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./css/App.css";

setupIonicReact();

const App: React.FC = () => {
  const [favoriteBreeds, setbreeds] = useState<number[]>();
  const changeColorPaw = () => {
    document.documentElement.style.setProperty("--color-paw", "red");
  };
  const changeColorHeart = () => {
    document.documentElement.style.setProperty("--color-heartOutline", "red");
  };
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 likes={(favorite: number[]) => setbreeds(favorite)} />
            </Route>
            <Route exact path="/tab2">
              <Tab2 favBreeds={favoriteBreeds!} />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon
                className="pawIcon"
                icon={paw}
                onClick={() => changeColorPaw()}
              />
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon
                className="heartIconOutline"
                icon={heartOutline}
                onClick={() => changeColorHeart()}
              />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
