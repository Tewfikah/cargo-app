import React from 'react';
import { ClipboardCheck, Package, Truck, ShieldCheck } from 'lucide-react';

export const howItWorksSteps = [
  {
    id: 1,
    title: "Request a Quote",
    description: "Submit cargo details for an AI-powered instant quote with total transparency on landed costs.",
    icon: <ClipboardCheck className="w-10 h-10 stroke-[1.5]" />,
    tag: "Analysis"
  },
  {
    id: 2,
    title: "Cargo Processing",
    description: "Professional grade handling at our secure facilities including documentation and safety audits.",
    icon: <Package className="w-10 h-10 stroke-[1.5]" />,
    tag: "Operations"
  },
  {
    id: 3,
    title: "Live Transit",
    description: "End-to-end visibility with GPS tracking and predictive ETA updates via our global fleet network.",
    icon: <Truck className="w-10 h-10 stroke-[1.5]" />,
    tag: "Logistics"
  },
  {
    id: 4,
    title: "Proof of Arrival",
    description: "Contactless delivery with digital proof and instant satisfaction feedback integration.",
    icon: <ShieldCheck className="w-10 h-10 stroke-[1.5]" />,
    tag: "Execution"
  }
];
