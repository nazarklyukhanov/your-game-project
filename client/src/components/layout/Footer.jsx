export default function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-white/60 border-t border-gray-300 shadow-inner mt-10">
      <div className="mx-auto max-w-7xl px-6 py-10 text-center">

        <p className="text-sm text-gray-600 italic">
          «This project doesn’t really do anything… but it definitely looks like it does.»
        </p>

        <p className="text-sm text-gray-500 mt-3">
          © {new Date().getFullYear()} My Skeleton
        </p>
      </div>
    </footer>
  );
}
