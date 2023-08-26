export default function Main({ tweet }) {
  const { content } = tweet;
  const { textContent, imageContent } = content;
  return (
    <>
      <p className="text-base width-auto font-thin text-white flex-shrink">
        {textContent}
      </p>
      {imageContent && (
        <div className="md:flex-shrink md:flex  md:justify-center pr-6 pt-3  spect-w-16  aspect-h-9 lg:aspect-none ">
          <img
            className="object-scale-down  sm:h-auto  md:w-60 w-96  rounded-lg "
            src={imageContent}
          />
        </div>
      )}
    </>
  );
}
