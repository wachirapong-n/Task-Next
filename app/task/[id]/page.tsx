export default function task({ params }) {
  return (
    <div>
      <div className="p-4">
        <div className="text-center text-xl font-bold">
          {params.id}
        </div>
      </div>
    </div>
  )
}