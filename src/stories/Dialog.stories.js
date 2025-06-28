import { useState } from 'react';
import Dialog from '../Dialog';

export default {
  title: 'Dialog',
  component: Dialog,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <Dialog {...args} onClose={handleClose}>
          <div>Add a new movie here.</div>
        </Dialog>
      )}
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
    </>
  );
};

export const DefaultDialog = Template.bind({});
DefaultDialog.args = {
  title: 'New Movie',
};
