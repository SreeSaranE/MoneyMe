import CategoryIcons from "@/components/icons/CategoryIcons"


function TestPage() {
  return (
    <div>
      <CategoryIcons
        onSelect={(iconId) => {
          console.log(iconId);
        }}
      />
      <CategoryIcons iconId={0} />
    </div>
  )
}

export default TestPage