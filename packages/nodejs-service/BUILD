package(default_visibility = ["//visibility:public"])

load("@npm//@bazel/typescript:index.bzl", "ts_project")

PRODUCTION_DEPENDENCIES = [
    "//packages/nodejs-dependency:package",
    "@npm//@highoutput/logger",
    "@npm//@koa/router",
    "@npm//koa",
    "@npm//ramda",
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
        "@npm//@types/koa",
        "@npm//@types/koa__router",
        "@npm//@types/node",
        "@npm//@types/ramda",
    ],
)

filegroup(
    name = "extra",
    srcs = glob([
        "schema/**/*",
    ]),
)

load("@io_bazel_rules_docker//nodejs:image.bzl", "nodejs_image")

nodejs_image(
    name = "docker_image",
    base = "@nodejs_base_image//image",
    data = [
        ":compile",
        ":extra",
    ] + PRODUCTION_DEPENDENCIES,
    entry_point = ":index.ts",
)

load("@io_bazel_rules_docker//container:container.bzl", "container_push")

container_push(
    name = "push_docker_image",
    image = "docker_image",
    format = "Docker",
    registry = "498457837717.dkr.ecr.ap-southeast-1.amazonaws.com",
    repository = "bazel-monorepo-template-nodejs-service",
)

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

nodejs_binary(
    name = "start",
    data = [":compile", ":extra"],
    entry_point = ":index.ts",
)