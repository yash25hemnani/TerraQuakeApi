// MetaData.jsx
export default function MetaData({ title, description }) {
  return (
    <>
      <title>{`${title} | TerraQuake`}</title>
      <meta name="description" content={description} />

      Open Graph
      <meta property="og:title" content={`${title} | TerraQuake`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={window.location.href} />
      

      Twitter
      <meta name="twitter:title" content={`${title} | TerraQuake`} />
      <meta name="twitter:description" content={description} />
      
    </>
  );
}
