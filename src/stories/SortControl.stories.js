import SortControl from '../SortControl';
import React, { useState } from 'react';

export default {
    title: 'SortControl',
    component: SortControl
};

const Template = (args) => {
    const [selected, setSelected] = useState(args.selectedValue);
    return React.createElement(SortControl, {
    selectedValue: selected,
    onChange: (val) => {
      setSelected(val);
      console.log('Sort changed to:', val);
    },
  });
};

export const Default = Template.bind({});
Default.args = {
    selectedValue: 'Title',
};
