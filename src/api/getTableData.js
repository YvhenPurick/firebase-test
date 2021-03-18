export const getTableData = () => {
  return fetch('https://us-central1-fir-auth-aab3a.cloudfunctions.net/table')
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
};
