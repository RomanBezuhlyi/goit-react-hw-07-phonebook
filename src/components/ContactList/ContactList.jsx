import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contacts';
import { getFilterValue } from 'redux/contacts';
import { Bars } from 'react-loader-spinner';
import { ContactListItem } from 'components/ContactListItem';
import { List } from './ContactList.styled';

export function ContactList() {
  const { data = [], error, isError, isLoading } = useGetContactsQuery();

  const filterValue = useSelector(getFilterValue);

  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLocaleLowerCase();
    return filterValue
      ? data.filter(item =>
          item.name
            .toLowerCase()
            .split(' ')
            .some(element => element.includes(normalizedFilter))
        )
      : data;
  };

  return (
    <>
      {isLoading && (
        <Bars
          height="40"
          width="40"
          color="blue"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {data && !isError && (
        <List>
          {getFilteredContacts().map(({ id }) => {
            return <ContactListItem key={id} id={id}></ContactListItem>;
          })}
        </List>
      )}
      {isError && <p>Sorry, {error.data}</p>}
    </>
  );
}
