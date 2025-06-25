#!/bin/bash
cd /home/kavia/workspace/code-generation/ideanest-70516-28bbd7d2/idea_vault_frontend_workspace/idea_vault_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
 if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

