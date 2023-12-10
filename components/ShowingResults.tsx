import React from "react";

interface ShowingResultsProps {
  resultsLength: number;
}

export default function ShowingResults({ resultsLength }: ShowingResultsProps) {
  return (
    <div className="flex justify-center items-center w-full max-w-full p-8">
      <span className="font-semibold">Showing {resultsLength} of 100:</span>
    </div>
  );
}
