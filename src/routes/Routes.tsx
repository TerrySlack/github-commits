import React, { FC } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Home } from "Containers/Home";
import { Commits } from "Containers/Commits";
import { NotFound } from "Containers/NotFound";

const history = createBrowserHistory();

interface Props {}

const AppRoutes: FC<Props> = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commits" element={<Commits />} />
        <Route path="/does/not/exist" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/does/not/exist" />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes, history };
