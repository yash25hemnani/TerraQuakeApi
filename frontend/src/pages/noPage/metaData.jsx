// MetaData.jsx
export default function MetaData({ title, description }) {
  return (
    <>
      <title>{`${title} | Terraquake`}</title>
      <meta name="description" content={description} />

      Open Graph
      <meta property="og:title" content={`${title} | Terraquake`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={window.location.href} />
      

      Twitter
      <meta name="twitter:title" content={`${title} | Terraquake`} />
      <meta name="twitter:description" content={description} />
      
    </>
  );
}
