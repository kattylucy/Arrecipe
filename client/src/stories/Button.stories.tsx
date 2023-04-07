import { Meta, Story } from '@storybook/react';
import { withDesign } from "storybook-addon-designs";
import { Button, ButtonProps } from '../components/button/Button';

const meta: Meta = {
  title: 'Button',
  component: Button,
  decorators: [withDesign],
  argTypes:{
    children: {
      defaultValue: 'New recipe +',
    }
  }
}

export default meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Outlined = Template.bind({});

export const Icon = Template.bind({});

Icon.args = {
  children: 'Icon button',
  variant: 'icon'
}

export const Contained = Template.bind({});

Contained.args = {
  children: 'Create recipe',
  variant: 'contained'
}

Contained.parameters = {
  design:{
    type: "figma",
    url: "https://www.figma.com/file/TzsB0Rrs6AaTM8CIKD8e2t"
  }
}

