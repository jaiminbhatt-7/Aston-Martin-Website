'use client';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-16 px-6 md:px-12 relative z-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-widest text-pagani-gold">ASTON MARTIN</h2>
                    <p className="text-gray-400 text-sm max-w-xs">
                        Power, Beauty, and Soul. The definition of automotive excellence.
                    </p>
                </div>

                <div className="flex gap-12 text-sm text-gray-400 uppercase tracking-widest">
                    <div className="space-y-4 flex flex-col">
                        <a href="#" className="hover:text-white transition-colors">Models</a>
                        <a href="#" className="hover:text-white transition-colors">Brand</a>
                        <a href="#" className="hover:text-white transition-colors">Ownership</a>
                    </div>
                    <div className="space-y-4 flex flex-col">
                        <a href="#" className="hover:text-white transition-colors">Enquire</a>
                        <a href="#" className="hover:text-white transition-colors">Media</a>
                        <a href="#" className="hover:text-white transition-colors">Careers</a>
                    </div>
                </div>

                <div className="space-y-4 text-center md:text-right">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Aston Martin Lagonda. <br />
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
