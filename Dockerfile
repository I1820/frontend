# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:alpine

# Install all dependencies of the current project.
COPY package.json package.json
RUN npm install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm build
CMD ["npm", "start"]
