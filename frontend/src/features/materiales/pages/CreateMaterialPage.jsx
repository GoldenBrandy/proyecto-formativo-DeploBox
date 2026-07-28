import MaterialRegisterForm from "../components/MaterialRegisterForm";

export default function CreateMaterialPage(props) {
  return (
    <div className="w-full flex justify-center">
      <MaterialRegisterForm {...props} />
    </div>
  );
}
