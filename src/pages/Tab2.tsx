import {
  IonAvatar,
  IonContent,
  IonItem,
  IonList,
  IonPage,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import "./Tab2.css";
import data from "../data/db";

const Tab2: React.FC<{
  favBreeds: number[];
}> = (props) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList>
          <div className="listHeader">
            <IonListHeader>Favorite breads</IonListHeader>
          </div>
          {props.favBreeds &&
            data
              .filter((row) => props.favBreeds.includes(row.id))
              .map((favorite) => {
                return [favorite].map((dog, index) => {
                  return (
                    <IonItem key={index}>
                      <IonAvatar slot="start">
                        <img src={dog.image} alt="" />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{dog.title.toUpperCase()}</h2>
                      </IonLabel>
                    </IonItem>
                  );
                });
              })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export { Tab2 };
