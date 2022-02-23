import React from 'react';

import { Page } from './Page';
// import * as HeaderStories from './Header.stories';

export default {
  title: 'Player/Variants',
  component: Page,
};

const Template = (args) => <Page {...args} />;

export const Simple = Template.bind({});
Simple.args = {
//   ...HeaderStories.LoggedIn.args,
};
