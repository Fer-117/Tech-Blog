function formatCreatedAt(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const createdAt = new Date(dateString).toLocaleString('en-US', options);
  return dateString;
}

module.exports = { formatCreatedAt };
