import PropTypes from 'prop-types';
import { Bars } from 'react-loader-spinner';
import { useDeleteContactMutation, useGetContactsQuery } from 'redux/contacts';
import { ListItem } from './ContactListItem.styled';
import { Button } from 'utilities';

export function ContactListItem({ id }) {
  const { data, isError } = useGetContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const { name, phone } = data.find(item => item.id === id);
  const handleClick = () => {
    deleteContact(id);
  };
  return (
    <ListItem>
      {data && !isError && (
        <>
          {name}: {phone}{' '}
          <Button type="button" onClick={handleClick} disabled={isDeleting}>
            {isDeleting ? (
              <Bars
                height="40"
                width="40"
                color="blue"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              'Delete'
            )}
          </Button>
        </>
      )}
      {isError && <p>Sorry, contact not found</p>}
    </ListItem>
  );
}

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
};
