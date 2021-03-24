package(default_visibility = ["//visibility:public"])

load("@npm//@bazel/typescript:index.bzl", "ts_project")

PRODUCTION_DEPENDENCIES = [
    "//projects/aggregate.deployment:package",
    "//projects/aggregate.service:package",
    "//projects/aggregate.user:package",
    "//projects/grpc:package",
    "//projects/library:package",
    "//projects/protos:package",
    "//projects/types:package",
    "@npm//@arque/core",
    "@npm//@highoutput/amqp",
    "@npm//@highoutput/delay",
    "@npm//@highoutput/error",
    "@npm//@highoutput/hash",
    "@npm//@highoutput/logger",
    "@npm//@koa/cors",
    "@npm//@koa/router",
    "@npm//@kubernetes/client-node",
    "@npm//@octokit/auth",
    "@npm//@octokit/auth-oauth-app",
    "@npm//@octokit/request",
    "@npm//ajv",
    "@npm//ajv-errors",
    "@npm//ajv-keywords",
    "@npm//apollo-server-koa",
    "@npm//arque",
    "@npm//async-exit-hook",
    "@npm//async-retry",
    "@npm//base32.js",
    "@npm//clean-deep",
    "@npm//crypto-random-string",
    "@npm//dataloader",
    "@npm//event-iterator",
    "@npm//graphql",
    "@npm//graphql-tools",
    "@npm//image-to-base64",
    "@npm//ip",
    "@npm//js-yaml",
    "@npm//jsonwebtoken",
    "@npm//koa",
    "@npm//koa-bodyparser",
    "@npm//koa-response-time",
    "@npm//luxon",
    "@npm//mongoose",
    "@npm//ms",
    "@npm//node-fetch",
    "@npm//nodemailer",
    "@npm//octonode",
    "@npm//p-queue",
    "@npm//ramda",
    "@npm//serialize-error",
    "@npm//simple-git",
    "@npm//valid-url",
    "@npm//fs-extra",
]

ts_project(
    name = "compile",
    srcs = glob(
        ["**/*.ts"],
        exclude = [
            "tests/**/*.*",
            "node_modules/**/*.*",
        ],
    ),
    source_map = True,
    validate = False,
    tsconfig = "tsconfig.json",
    extends = "//:tsconfig.json",
    deps = PRODUCTION_DEPENDENCIES + [
        "@npm//@types/node",
        "@npm//@types/ramda",
    ],
)

filegroup(
    name = "extra",
    srcs = glob([
        "schema/*.gql",
        ".kube/**/*",
        "certbot-account/**/*",
    ]) + [
        "github-private-key.pem"
    ],
)

load("@io_bazel_rules_docker//nodejs:image.bzl", "nodejs_image")

nodejs_image(
    name = "image",
    base = "@service_deployment_base//image",
    data = [":compile", ":extra"] + PRODUCTION_DEPENDENCIES,
    entry_point = ":index.ts",
)

load("@io_bazel_rules_docker//container:container.bzl", "container_push")

container_push(
    name = "push_image",
    image = "image",
    format = "Docker",
    registry = "docker.io",
    repository = "gintodev/service.api",
)

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

nodejs_binary(
    name = "start",
    data = [":compile", ":extra"],
    entry_point = ":index.ts",
)