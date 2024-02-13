import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";


const data = {
  events: [
    {
        id: 1,
        type: "conférence",
        date: "2022-01-29T20:28:45.744Z",
        title: "User&product MixUsers",
        cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
        description: "Présentation des nouveaux usages UX.",
        nb_guesses: 900,
        periode: "14-15-16 Janvier",
        prestations: [
            "1 espace d’exposition",
            "1 scéne principale",
            "1 espace de restaurations"
        ]
    },
    {
        id: 2,
        type: "expérience digitale",
        date: "2022-12-29T20:28:45.744Z",
        title: "#DigitonPARIS",
        cover: "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
        description: "Présentation des outils analytics aux professionnels du secteur ",
        nb_guesses: 1300,
        periode: "24-25-26 Decembre",
        prestations: [
            "1 espace d’exposition",
            "1 scéne principale",
            "1 site web dédié"
        ]
    },
    {
        id: 3,
        type: "conférence",
        date: "2022-04-29T20:28:45.744Z",
        title: "Conférence &co-responsable",
        cover: "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
        description: "Débats et échanges autour des collaborations eco-responsable.",
        nb_guesses: 600,
        periode: "24-25-26 Avril",
        prestations: [
            "1 scéne principale",
            "1 espaces de restaurations",
            "1 site web dédié"
        ]
    },
  ],
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("should display a list of events", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await new Promise(res => {window.setTimeout(res, 50)});
    const cards = await screen.findAllByTestId("card-testid");
    expect(cards.length).toBe(4); // 3 in list of event + 1 in footer
  });

  it("should display a slider", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    const {container} = render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await new Promise(res => {window.setTimeout(res, 50)});
    const slides = container.querySelectorAll(".SlideCard");
    expect(slides.length).toBe(3)
  })
  it("should displayed a list of people", () => {
    render (<Home />);
    const imageCard = document.querySelector(".ListContainer .PeopleCard__image");
    const nameCard = document.querySelector(".ListContainer .PeopleCard__name");
    const positionCard = document.querySelector(".ListContainer .PeopleCard__position");
    expect(imageCard.src).toBe("http://localhost/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png");
    expect(nameCard.textContent).toBe("Samira");
    expect(positionCard.textContent).toBe("CEO");
  })
  it("should display a footer", () => {
    render (<Home />)
    const footerContact = document.querySelector(".contact h3");
    const footerAdress = document.querySelector(".contact address");
    const footerPhoneNumber = document.querySelector(".phoneNumber");
    const footerMail = document.querySelector(".mail");
    expect(footerContact.textContent).toBe("Contactez-nous");
    expect(footerAdress.textContent).toBe("45 avenue de la République, 75000 Paris");
    expect(footerPhoneNumber.textContent).toBe("01 23 45 67 89");
    expect(footerMail.textContent).toBe("contact@724events.com");
  })
  it("should display an event card, with the last event", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    const {container} = render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await new Promise(res => {window.setTimeout(res, 50)});
    const label = container.querySelector(".EventCard--small .EventCard__label");
    const date = container.querySelector(".EventCard--small .EventCard__month");
    const title = container.querySelector(".EventCard--small .EventCard__title");
    expect(label.textContent).toBe("boom");
    expect(date.textContent).toBe("décembre");
    expect(date.textContent).not.toBe("janvier");
    expect(date.textContent).not.toBe("avril");
    expect(title.textContent).toBe("#DigitonPARIS");
  })
});
