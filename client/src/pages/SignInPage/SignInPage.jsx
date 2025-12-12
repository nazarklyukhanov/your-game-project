import SignInForm from '../../features/SignInForm/SignInForm';

export default function SignInPage({ setUser }) {
  return (
    <div className="flex flex-1">
      <SignInForm setUser={setUser} />
    </div>
  );
}
