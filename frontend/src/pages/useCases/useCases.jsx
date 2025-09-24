import MetaData from "@pages/noPage/metaData";

export default function UseCases() {
  const useCaseDocs = [
    {
      title: "Early Warning Systems",
      content:
        "TerraQuake API can feed real-time seismic data into early warning systems, allowing communities to receive alerts and take precautionary measures in the event of an earthquake.",
    },
    {
      title: "Disaster Response Planning",
      content:
        "Emergency management agencies and NGOs can use the API to analyze earthquake patterns and prepare response strategies, optimizing resource allocation and minimizing risks.",
    },
    {
      title: "Research and Education",
      content:
        "Researchers and students can access historical and real-time data to study seismic activity, test models, or develop educational tools that raise awareness about earthquakes and their impact.",
    },
    {
      title: "Application Development",
      content:
        "Developers can integrate TerraQuake API into web or mobile applications, such as earthquake monitoring dashboards, alert apps, or geospatial visualizations, providing users with up-to-date and accurate information.",
    },
    {
      title: "Community and Organizational Insights",
      content:
        "Organizations and local authorities can monitor seismic activity in their regions, supporting infrastructure planning, risk assessment, and community safety initiatives.",
    },
    {
    title: "Insurance & Risk Assessment",
    content:
      "Insurance companies can leverage seismic data from TerraQuake API to assess earthquake risks, calculate premiums, and plan coverage strategies more accurately, helping reduce financial losses and improve client safety.",
  },
  ];

  return (
    <>
      <MetaData title="Use Cases" description="Use Cases for TerraQuake API" />
      <section className="relative z-30 w-full min-h-screen px-6 py-20">
        <div className="flex flex-col justify-center items-center mb-16">
          <h1 className="text-2xl md:text-3xl text-white font-extrabold text-center mb-5 tracking-tight">
            Use Cases for TerraQuake API
          </h1>
          <p className="text-white text-center w-[75%]">
            Use Cases describe real-world scenarios where TerraQuake API can be
            applied. By providing fast, reliable access to seismic data, the API
            enables developers, researchers, institutions, and organizations to
            create applications focused on safety, monitoring, education, and
            disaster prevention.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-2">
          {useCaseDocs.map((item) => (
            <div
              key={item.title}
              className="bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 border-l-4 border-purple-600 pl-4">
                {item.title}
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}