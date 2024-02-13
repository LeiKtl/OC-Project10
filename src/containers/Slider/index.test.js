import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
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

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });

  it("should create a slide for each focused events", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    const {container} = render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await new Promise(res => {window.setTimeout(res, 50)});
    const slides = container.querySelectorAll(".SlideCard");
    expect(slides.length).toBe(3)
    const slidesTitle = container.querySelectorAll(".SlideCard__description h3");
    expect(slidesTitle[0].textContent).toBe("World Farming Day");
    expect(slidesTitle[1].textContent).toBe("World economic forum");
    expect(slidesTitle[2].textContent).toBe("World Gaming Day");
  });

  it("should update slide each 5seconds", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    const {container} = render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await new Promise(res => {window.setTimeout(res, 50)});
    const slides = container.querySelectorAll(".SlideCard");
    expect(slides[0]).toHaveClass("SlideCard--display");
    expect(slides[1]).toHaveClass("SlideCard--hide");
    await new Promise(res => {window.setTimeout(res, 5000)});
    expect(slides[0]).toHaveClass("SlideCard--hide");
    expect(slides[1]).toHaveClass("SlideCard--display");
  });
});
