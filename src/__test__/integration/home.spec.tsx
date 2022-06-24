import React, { MouseEvent, ChangeEvent, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  render,
  RenderResult,
  fireEvent,
  // waitForElement,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { Home as HomeContainer } from "Containers/Home";
import { Home as HomeComponent } from "Components/Home";

//This is the state for the reducer in the project.
const initialState = {
  common: {
    navigateUrl: "",
    owner: "",
    repo: "",
    commits: [],
    page: 1,
    isEndOfCommits: false,
  },
};

interface Props {
  children: ReactNode | ReactNode[];
}

//Add a provider for tests that need it
const Provider = ({ children }: Props) => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

//Add a router for tests that need it
const Router = ({ children }: Props) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

let documentBody: RenderResult;

describe("Home Container", () => {
  beforeEach(() => {
    documentBody = render(
      <Router>
        <Provider>
          <HomeContainer />
        </Provider>
      </Router>
    );
  });

  it("matches snapshot", () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});

interface HomeComponentProps {
  isButtonEnabled: boolean;
  onSubmit: (e: MouseEvent<HTMLFormElement>) => void;
  onOwnerChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRepoChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const renderHomeComponent = (props: Partial<HomeComponentProps> = {}) => {
  const defaultProps: HomeComponentProps = {
    onSubmit() {
      return;
    },
    onOwnerChange() {
      return;
    },
    onRepoChange() {
      return;
    },
    isButtonEnabled: false,
  };

  return render(<HomeComponent {...defaultProps} {...props} />);
};

describe("Home Component", () => {
  it("button has class data-test-button", async () => {
    const { findByTestId } = renderHomeComponent();
    const searchButton = await findByTestId("search");
    expect(1).toBe(1);
    expect(searchButton.classList.contains("data-test-button")).toBe(true);
  });

  test("should allow entering a repository owner", async () => {
    const onOwnerChange = jest.fn();

    const { findByTestId } = renderHomeComponent({ onOwnerChange });

    const owner = (await findByTestId("owner")) as HTMLInputElement;

    fireEvent.change(owner, { target: { value: "facebook" } });

    expect(owner.value).toBe("facebook");
    expect(onOwnerChange).toHaveBeenCalledTimes(1);
  });

  test("should allow entering a repository name", async () => {
    const onRepoChange = jest.fn();

    const { findByTestId } = renderHomeComponent({ onRepoChange });

    const owner = (await findByTestId("repo")) as HTMLInputElement;

    fireEvent.change(owner, { target: { value: "react" } });

    expect(owner.value).toBe("react");
    expect(onRepoChange).toHaveBeenCalledTimes(1);
  });

  test("should submit the form with facebook and react", async () => {
    // const onSubmit = jest.fn();
    const onSubmit = jest.fn((e) => e.preventDefault());

    const { findByTestId } = renderHomeComponent({
      onSubmit,
    });

    const username = (await findByTestId("owner")) as HTMLInputElement;
    const password = (await findByTestId("repo")) as HTMLInputElement;
    const search = (await findByTestId("search")) as HTMLButtonElement;
    const homeForm = await findByTestId("home-form");

    fireEvent.change(username, { target: { value: "facebook" } });
    fireEvent.change(password, { target: { value: "react" } });
    fireEvent.click(search);

    // expect(onSubmit).toHaveBeenCalledWith("facebook", "react");
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(homeForm).toHaveFormValues({
      owner: "facebook",
      repo: "react",
    });
  });
  it("matches snapshot", async () => {
    const { findByTestId } = renderHomeComponent();

    const homeForm = await findByTestId("home-form");

    expect(homeForm).toHaveFormValues({
      owner: "",
      repo: "",
    });
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
