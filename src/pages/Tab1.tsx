import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
} from "@ionic/react";
import "./Tab1.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "@ionic/react/css/ionic-swiper.css";
import {
  arrowBackOutline,
  arrowDown,
  arrowForwardOutline,
  arrowUp,
  closeOutline,
  heart,
  imagesSharp,
} from "ionicons/icons";
import { Swiper as SwiperInterface } from "swiper";
import React, { useState } from "react";
import data from "../data/db";

var subtitle: string = "";
let favorites: number[] = [];

const Tab1: React.FC<{
  likes: (f: number[]) => void;
}> = (props) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
  const addToFavorites = () => {
    if (!favorites.includes(swiperInstance!.activeIndex)) {
      favorites.push(swiperInstance!.activeIndex);
      document.documentElement.style.setProperty("--color-heart", "red");
      props.likes([...favorites]);
    } else {
      favorites = favorites.filter(
        (value: any) => value !== swiperInstance?.activeIndex
      );
      document.documentElement.style.setProperty("--color-heart", "gray");
      props.likes(favorites);
    }
  };

  const slider = () => {
    if (favorites.includes(swiperInstance!.activeIndex)) {
      document.documentElement.style.setProperty("--color-heart", "red");
    } else {
      document.documentElement.style.setProperty("--color-heart", "gray");
    }
  };

  const openInfo = () => {
    if (subtitle.length === 0) makeSubtitle(0);
    document.querySelector(".downArrow")?.classList.add("hidden");
    document.querySelector(".upArrow")?.classList.remove("hidden");
    document.querySelector(".cardContent")?.classList.add("cardContentInfo");
  };
  const closeInfo = () => {
    //document.querySelector(".cardContent")?.classList.add("hidden");
    document.querySelector(".downArrow")?.classList.remove("hidden");
    document.querySelector(".upArrow")?.classList.add("hidden");
    document.querySelector(".cardContent")?.classList.remove("cardContentInfo");
  };

  const makeSubtitle = (index: number) => {
    subtitle = Object.values(data)[index].subtitle;
    document.getElementById("sub")!.textContent = subtitle;
    //document.getElementById("card")?.setAttribute("key", `${index + 1}`);
  };
  const [myModal, setMyModal] = useState({ isOpen: false });
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar className="toolbar">
            <IonTitle>SELECTION</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <Swiper
            //onLoad={makeSubtitle(0)!}
            observer={true}
            observeParents={true}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            onSlideChange={closeInfo}
            onSlideChangeTransitionEnd={() => {
              slider();
              makeSubtitle(swiperInstance!.activeIndex);
            }}
            slidesPerView={1}
          >
            {data.map((card, index) => {
              return (
                <SwiperSlide id="card" key={index}>
                  <div>
                    <IonCardContent>
                      <IonCardTitle className="title">
                        {card.title}
                      </IonCardTitle>
                    </IonCardContent>
                    <IonCardContent>
                      <div id="container">
                        <IonImg src={card.image} alt="card"></IonImg>
                      </div>
                    </IonCardContent>
                  </div>

                  <IonModal
                    backdropDismiss={true}
                    animated={false}
                    isOpen={myModal.isOpen}
                  >
                    <IonCard className="galleryCard">
                      <IonIcon
                        className="closeIcon"
                        size="large"
                        icon={closeOutline}
                        onClick={() => setMyModal({ isOpen: false })}
                      ></IonIcon>
                      <Swiper loop={true} slidesPerView={1}>
                        {data
                          .filter(
                            (row) => row.id === swiperInstance?.activeIndex
                          )
                          .map((active) => {
                            return active.images.map((dogImg, index) => {
                              return (
                                <SwiperSlide key={index}>
                                  <IonCardContent className="galleryContent">
                                    <IonImg
                                      className="galleryImg"
                                      src={dogImg.src}
                                    ></IonImg>
                                  </IonCardContent>
                                </SwiperSlide>
                              );
                            });
                          })}
                      </Swiper>
                      <IonCardContent className="arrows">
                        <div className="moveArrows">
                          <IonIcon
                            size="large"
                            className="backArrow"
                            icon={arrowBackOutline}
                          ></IonIcon>
                          <IonIcon
                            size="large"
                            className="forwardArrow"
                            icon={arrowForwardOutline}
                          ></IonIcon>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonModal>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div>
            <div className="cardContent">
              <IonCardContent>
                <IonNote id="sub" className="subtitle"></IonNote>
              </IonCardContent>
            </div>
            <IonCardContent className="iconRowTop">
              <IonIcon
                className="redIcon red"
                size="large"
                icon={heart}
                onClick={() => addToFavorites()}
              ></IonIcon>
              <IonIcon
                onClick={() => setMyModal({ isOpen: true })}
                size="large"
                icon={imagesSharp}
              ></IonIcon>
              <IonIcon
                className="upArrow hidden"
                size="large"
                icon={arrowUp}
                onClick={closeInfo}
              ></IonIcon>
              <IonIcon
                className="downArrow"
                size="large"
                icon={arrowDown}
                onClick={openInfo}
              ></IonIcon>
            </IonCardContent>
          </div>
        </IonCard>
        <IonCard></IonCard>
      </IonContent>
    </IonPage>
  );
};

export { Tab1, favorites };
