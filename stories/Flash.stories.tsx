import React from "react";
import { Story, ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Flash, Props } from "../src/Flash";
import { useInterval } from "./useInterval";
import { ValueSetter } from "./components/ValueSetter";
import pkg from "../package.json";

export default {
  title: "Flash",
  component: Flash,
  parameters: {
    componentSubtitle: pkg.description,
  },
} as ComponentMeta<typeof Flash>;

const numberMap: { [key: string]: string } = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const Template: Story<Props> = (args) => {
  return (
    <ValueSetter>
      {(value: number) => <Flash {...args} value={value} />}
    </ValueSetter>
  );
};

export const Default = Template.bind({});

export const StreamingData = () => {
  const [hasRan, setHasRan] = React.useState<boolean>(false);
  const [val, setVal] = React.useState<number>(1);

  useInterval(() => {
    if (Math.random() > 0.8) {
      setHasRan(true);
      setVal(Math.floor(Math.random() * 100) - 50);
    }
  }, 200);

  return (
    <div>
      <p>
        Stream:&nbsp;
        {hasRan ? "Connected!" : "Loading..."}
      </p>

      <Flash value={val} />
    </div>
  );
};

StreamingData.parameters = {
  chromatic: {
    disable: true,
  },
};

export const CustomColors = Template.bind({});

CustomColors.args = {
  upColor: "blue",
  downColor: "purple",
};

export const NoTransition = Template.bind({});

NoTransition.args = {
  transition: "none",
};

export const TransitionLength = Template.bind({});

TransitionLength.args = {
  timeout: 1200,
  transitionLength: 1000,
};

export const NumberFormatter = Template.bind({});

NumberFormatter.args = {
  formatter: "number",
};

export const CurrencyFormatter: ComponentStory<typeof Flash> = () => {
  return (
    <ValueSetter upLabel="Add one dollar" downLabel="Subtract one dollar">
      {(value: number) => <Flash value={value} formatter="currency" />}
    </ValueSetter>
  );
};

CurrencyFormatter.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText("$20,000.00")).toBeInTheDocument();

  await userEvent.click(canvas.getByTestId("first-button"));

  await expect(canvas.getByText("$20,001.00")).toBeInTheDocument();
};

export const PercentageFormatter = () => {
  return (
    <ValueSetter initialValue={1} upLabel="Add 100%" downLabel="Subtract 100%">
      {(value: number) => <Flash value={value} formatter="percentage" />}
    </ValueSetter>
  );
};

export const CustomFormatter = () => {
  return (
    <ValueSetter>
      {(value: number) => (
        <Flash
          value={value}
          formatterFn={(val) => {
            return `[${`${val}`
              .split("")
              .map((v) => numberMap[v])
              .join(", ")}]`;
          }}
        />
      )}
    </ValueSetter>
  );
};

export const StylingComponentClassNames = () => {
  return (
    <div className="styling-component-class-names">
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          .styling-component-class-names .rvf_Flash--positive:after {
            content: '👍';
          }

          .styling-component-class-names .rvf_Flash--negative:after {
            content: '👎';
          }

          .styling-component-class-names .rvf_Flash--even:after {
            content: '🤙';
          }

          .styling-component-class-names .rvf_Flash--flashing {
            color: #fff;
          }

          .styling-component-class-names .rvf_Flash--flashing-up {
            background-color: blue !important;
          }

          .styling-component-class-names .rvf_Flash--flashing-down {
            background-color: orange !important;
          }
        `,
        }}
      />

      <ValueSetter initialValue={0}>
        {(value: number) => <Flash value={value} />}
      </ValueSetter>
    </div>
  );
};

export const MakeItNice = () => {
  return (
    <div className="make-it-nice">
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          .make-it-nice .rvf_Flash {
            border: 1px solid rgba(0, 0, 0, .1);
            border-radius: 3px;
            display: inline-flex;
            margin: 50px;
            width: 150px;
            padding: 20px 40px 25px;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont;
            font-size: 42px;
            font-weight: 200;
            box-shadow: 0 11px 17px -8px rgba(0, 0, 0, 0.3);
            transition-property: background-color, box-shadow, border-color !important;
          }

          .make-it-nice .rvf_Flash:hover {
            box-shadow: 0 11px 14px -11px rgba(0, 0, 0, 0.3);
          }

          .make-it-nice .rvf_Flash:hover:not(.rvf_Flash--flashing) {
            background-color: rgba(0, 0, 0, 0.03);
          }

          .make-it-nice .rvf_Flash__value {
            transition: color .1s ease-in-out;
          }

          .make-it-nice .rvf_Flash--flashing-up {
            border-color: #07b357;
          }

          .make-it-nice .rvf_Flash--flashing-down {
            border-color: #912b19;
          }

          .make-it-nice .rvf_Flash--flashing .rvf_Flash__value {
            color: #fff;
          }
        `,
        }}
      />

      <ValueSetter initialValue={999}>
        {(value: number) => (
          <div className="example-wrapper">
            <Flash value={value} formatter="currency" />
          </div>
        )}
      </ValueSetter>
    </div>
  );
};
