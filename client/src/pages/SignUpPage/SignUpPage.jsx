import SignUpForm from '../../features/SignUpForm/SignUpForm';

export default function SignUpPage({ setUser }) {
  return (
    <div className="flex flex-1">
      <SignUpForm setUser={setUser} />
    </div>
  );
}
