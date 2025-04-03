import React from "react";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Footer from "../Footer";

const Home = () => {
  return (
    <div className={styles.home_container}>
      <header className={styles.header}>
        <h1>Bike Master</h1>
      </header>
      <Navigation />
      <div className={styles.content}>
        <h2>Ponad 100 lat pasji i doświadczenia</h2>
        <h3>O nas</h3>
        <p>
                Jesteśmy firmą z siedzibą w Lublinie, działającą nieprzerwanie od 1920 roku. Nasza pasja do rowerów i zamiłowanie do doskonałości napędzają nas każdego dnia. Zaczynaliśmy jako mały warsztat, ale dzięki nieustannemu dążeniu do jakości i innowacji staliśmy się jednym z najbardziej zaufanych serwisów rowerowych w regionie.
            </p>
            <p>
                Nasz zespół składa się z doświadczonych mechaników i entuzjastów rowerowych, którzy nie tylko znają każdy model roweru na wylot, ale także sami regularnie jeżdżą. Dzięki temu doskonale rozumiemy potrzeby naszych klientów, niezależnie od tego, czy są to rowerzyści miejscy, górscy, czy też miłośnicy długodystansowych wypraw.
            </p>
            <p>
                Oferujemy szeroki zakres usług, od podstawowych napraw i konserwacji po zaawansowane tuningowanie i personalizację rowerów. W naszym warsztacie używamy tylko najwyższej jakości części i narzędzi, aby zapewnić, że każdy rower, który opuszcza nasze progi, jest w doskonałym stanie. Współpracujemy z wieloma renomowanymi producentami, co pozwala nam na dostęp do najnowszych technologii i rozwiązań.
            </p>
            <p>
                Jesteśmy dumni z naszego dziedzictwa, ale jednocześnie patrzymy w przyszłość. Regularnie organizujemy warsztaty i szkolenia dla młodych adeptów sztuki rowerowej, a także wspieramy lokalne imprezy i zawody rowerowe. Chcemy, aby nasza społeczność rowerowa rosła i rozwijała się, dlatego angażujemy się w różnorodne inicjatywy promujące zdrowy i aktywny tryb życia.
            </p>
            <p>
                Wierzymy, że rower to nie tylko środek transportu, ale styl życia. To sposób na poznawanie świata, przeżywanie przygód i dbanie o własne zdrowie. Dlatego dokładamy wszelkich starań, aby każdy nasz klient mógł cieszyć się jazdą na rowerze bez żadnych przeszkód. Zapraszamy do odwiedzenia naszego serwisu i dołączenia do rodziny Bike Master – miejsca, gdzie każdy rower jest traktowany z najwyższą troską i uwagą.
            </p>

      </div>
      <Footer />
    </div>
  );
};

export default Home;
