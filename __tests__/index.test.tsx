import { render, screen } from "@testing-library/react";
import ListControl from "@/components/ListControl";
import Home from "../pages";
import Header from "@/components/Header";
import ShowingResults from "@/components/ShowingResults";

describe("Crypto List Index Page", () => {
  it("should render the header", () => {
    render(<Header />);
    const header = screen.getByText("Crypto List");
    expect(header).toBeInTheDocument();
  });

  it("should render the list control", () => {
    render(
      <ListControl
        handleFilterData={() => {}}
        nextDisabled={true}
        page={1}
        onPageChange={() => {}}
      />
    );
    const listControl = screen.getByRole("ListControl");
    expect(listControl).toBeInTheDocument();
  });
});
describe("Crypto List ListControl", () => {
  beforeEach(() => {
    render(
      <ListControl
        handleFilterData={() => {}}
        nextDisabled={true}
        page={1}
        onPageChange={() => {}}
      />
    );
  });

  it("should render the previous page button", () => {
    const previousPageButton = screen.getByText("Previous Page");
    expect(previousPageButton).toBeInTheDocument();
  });

  it("should render the next page button", () => {
    const nextPageButton = screen.getByText("Next Page");
    expect(nextPageButton).toBeInTheDocument();
  });

  it("should render the previous page button as disabled when page is 1", () => {
    const previousPageButton = screen.getByText("Previous Page");
    expect(previousPageButton).toBeDisabled();
  });

  it("should render the next page button disabled when the number of items is less than 100", () => {
    const nextPageButton = screen.getByText("Next Page");

    expect(nextPageButton).toBeDisabled();
  });
});
